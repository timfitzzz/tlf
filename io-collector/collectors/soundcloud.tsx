import { IioRecordsListItem } from "../collect"
/* eslint-disable @typescript-eslint/camelcase */

import axios, { AxiosRequestConfig } from "axios"
const qs = require("qs")
import { getLastRecordDate } from "../getLastRecord"
import { SoundcloudTrackV2 } from "soundcloud.ts"
import { IOMDXRecord } from "../types"
import { generateIOMDXFileContents } from "../write"
import { DateTime } from "luxon"
const sanitize = require("sanitize-filename")
const fs = require("fs")

// import { forEach as asyncForEach } from "async-foreach"

export interface IcollectSoundCloud {
  apiKey: string
  usersToScrape: string[]
  mdxFolder: string
  ioRecordsList: IioRecordsListItem[]
}

export async function getSoundCloudUserId(userName: string, apiKey: string) {
  const paramsSerializer = function (params: {
    [key: string]: number | string
  }) {
    return qs.stringify(params, { encode: false })
  }

  let config: AxiosRequestConfig = {
    method: "get",
    url: "https://api.soundcloud.com/resolve",
    params: {
      url: `https://soundcloud.com/${userName}`,
      client_id: apiKey,
    },
    headers: {},
    paramsSerializer,
  }
  let result = await axios(config) //.catch(err => console.log(err))
  return result ? result.data.id : "0"
}

// export async function fetchSoundCloudResource(
//   resource: string,
//   userName: string,
//   apiKey: string,
//   options: string
// ) {
//   let userId = await getSoundCloudUserId(userName, apiKey)

//   const url = `https://api.soundcloud.com/users/${userId}${resource}?client_id=${apiKey}`
//   return (await axios.get(url)).data
// }

export async function getSoundCloudUserTracksSince(
  userName: string,
  apiKey: string,
  lastDate: Date
): Promise<SoundcloudTrackV2[]> {
  let userId = await getSoundCloudUserId(userName, apiKey)

  // console.log(`SoundCloud user id for ${userName} is ${userId}`)

  // let options = [`limit=100`, `linked_partition=1`]

  let tracks: SoundcloudTrackV2[] = []
  let nextPageUrl = ""
  // let pageCount = 1
  let done = false

  while (!done) {
    let url = ""

    if (!nextPageUrl) {
      url = `https://api.soundcloud.com/users/${userId}/tracks`
    } else {
      url = nextPageUrl
    }

    let config: AxiosRequestConfig = {
      method: "get",
      url: url,
      params: {
        limit: 100,
        linked_partitioning: 1,
        client_id: apiKey,
      },
      headers: {},
    }

    let result = (await axios(config)).data
    // console.log(result)

    let { collection, next_href } = result

    let newTracks: SoundcloudTrackV2[] = collection.filter(
      (track: SoundcloudTrackV2) => new Date(track.created_at) > lastDate
    )

    // console.log(
    //   `found ${newTracks.length} new results for ${userId} on page ${pageCount}`
    // )

    if (newTracks.length === 0) {
      done = true
    } else {
      newTracks.forEach((track) => tracks.push(track))
      // pageCount = pageCount + 1
      nextPageUrl = next_href
    }
  }

  // console.log(`found ${tracks.length} tracks for ${userName} (${userId})`)
  return tracks
}

export const getNewSoundCloudTracks = async (
  apiKey: string,
  usersToScrape: string[],
  ioRecordsList: IioRecordsListItem[]
) => {
  let lastRecordDate: Date = getLastRecordDate("soundcloud", ioRecordsList)

  let newTracks: any[] = []

  await Promise.all(
    usersToScrape.map(async (user) => {
      return await getSoundCloudUserTracksSince(user, apiKey, lastRecordDate)

      // userTracks.forEach(track => newTracks.push(track))
    })
  ).then((userTracksArray) =>
    userTracksArray.forEach((userTracks) =>
      userTracks.forEach((track) => newTracks.push(track))
    )
  )

  // console.log("done with users loop")

  return newTracks
}

interface SoundCloudTrackMDXObject extends IOMDXRecord {
  templateKey: "soundcloud"
  source: "soundcloud"
}

function generateTrackObject(
  track: SoundcloudTrackV2
): SoundCloudTrackMDXObject {
  let { title, created_at, description, uri, user, genre } = track

  return {
    templateKey: "soundcloud",
    source: "soundcloud",
    title,
    date: created_at,
    description: description ? description : "",
    URI: uri,
    tags: ["music", user.username, genre, "soundcloud"],
    // data: JSON.stringify(track),
    body: [description ? description : ""],
  }
}

function writeNewRecords(tracks: SoundcloudTrackV2[], mdxFolder: string) {
  tracks.forEach((track) => {
    const trackObject = generateTrackObject(track)
    const trackFile = generateIOMDXFileContents(trackObject)

    // console.log(track.created_at)
    let dateString = DateTime.fromFormat(
      track.created_at,
      "yyyy/MM/dd HH:mm:ss ZZZ"
    )

    fs.writeFileSync(
      `${mdxFolder}/${dateString}-${sanitize(trackObject.title).replace(
        /[ ']/g,
        (c: "'" | " ") => ({ "'": "", " ": "_" }[c])
      )}.mdx`,
      trackFile
    )
  })
}

export const collectSoundCloud = ({
  apiKey,
  usersToScrape,
  mdxFolder,
  ioRecordsList,
}: IcollectSoundCloud) => {
  getNewSoundCloudTracks(apiKey, usersToScrape, ioRecordsList).then((tracks) =>
    writeNewRecords(tracks, mdxFolder)
  )
}
