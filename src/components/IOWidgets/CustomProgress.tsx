// import React from 'react'
// import styled from 'styled-components'
// import SoundCloudAudio from 'soundcloud-audio'

// const Progress = ({onSeekTrack, soundCloudAudio, className, innerClassName, style, innerStyle, value, currentTime, duration}) => {

//   function handleSeekTrack(e) {
//     const xPos = (e.pageX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.offsetWidth;

//     if (soundCloudAudio && !isNaN(soundCloudAudio.audio.duration)) {
//       soundCloudAudio.audio.currentTime = (xPos * soundCloudAudio.audio.duration);
//     }

//     onSeekTrack && onSeekTrack.call(this, xPos, e);
//   }

//   if (!value && currentTime && duration) {
//     value = (currentTime / duration) * 100 || 0;
//   }

//   if (value < 0) {
//     value = 0;
//   }

//   if (value > 100) {
//     value = 100;
//   }

//   if (!innerStyle) {
//     innerStyle = {};
//   }

//   innerStyle = Object.assign({}, innerStyle, {width: `${value}%`});

//   return (
//     <div className={classNames} style={style} onClick={::this.handleSeekTrack}>
//       <div className={innerClassNames} style={innerStyle} />
//     </div>
//   )
// }

// Progress.propTypes = {
//   className: PropTypes.string,
//   innerClassName: PropTypes.string,
//   innerStyle: PropTypes.object,
//   value: PropTypes.number,
//   onSeekTrack: PropTypes.func,
//   soundCloudAudio: PropTypes.instanceOf(SoundCloudAudio)
// };

// Progress.defaultProps = {
//   value: 0
// };

// export default Progress;

// export const CustomProgress = styled(Progress)`
//   box-sizing: border-box;
//   border-radius: 3px;
//   margin-bottom: 0.5rem;
//   margin-top: 0.5rem;
//   background-color: #ddd;
//   width: 100%;
//   height: 8px;
//   overflow: hidden;
//   cursor: pointer;

//   > div {
//     border-radius: 3px 0 0 3px;
//     background-color: ${p => p.theme.palette.lightBackground};
//     height: 100%;
//     transition: width 0.2s ease-in;
//     cursor: pointer;
//   }
// `
