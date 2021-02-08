import { IioRecordsListItem } from "./collect"

export function getLastRecordDate(
  templateKey: string,
  ioRecordsList: IioRecordsListItem[]
): Date {
  const keyRecordsList = ioRecordsList
    .filter(record => record.templateKey === templateKey)
    .sort((a, b) => (new Date(b.date) as any) - (new Date(a.date) as any))

  var lastUpdatedRecord =
    keyRecordsList.length > 0
      ? new Date(keyRecordsList[0].date)
      : new Date("1/1/1970")

  // console.log(
  //   `latest existing ${templateKey} record date: ${lastUpdatedRecord}`
  // )

  return lastUpdatedRecord
}
