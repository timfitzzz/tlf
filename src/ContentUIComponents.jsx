import React, { useState } from 'react';
import { Box, Flex } from 'rebass';
import styled from 'styled-components';

export const CVSectionTitle = styled.div`
  font-family: ${p=>p.theme.fonts.title1};
  font-size: 20px;
  font-weight: 500;
  line-height: 20px;
  padding: 10px 0px 5px 0px;
`

export const CVEmployer = styled.div`
  font-family: ${p=>p.theme.fonts.title2};
  font-size: 16px;
  line-height: 21px;
  font-weight: 600;
  margin-top: 0px;
`

export const CVDates = styled.div`
  font-family: ${p=>p.theme.fonts.title1};
  line-height: 21px;
  margin-left: auto;
  margin-top: auto;
`
  
export const CVJobTitle = styled.div`
  font-family: ${p=>p.theme.fonts.title1};
  font-size: 16px;
  line-height: 20px;
  margin-top: 4px;
`

export const CVFlexBreak = styled.div`
  flex-basis: 100%;
  height: 0;
`
  
export const CVLocation = styled.div`
  font-family: ${p=>p.theme.fonts.title1};
  font-style: italic;

  white-space: nowrap;
  margin-left: 8px;
  font-size: 14px;
  line-height: 21px;
`

export const CVDescription = styled.div`
  font-family: ${p=>p.theme.fonts.body};
  font-size: 15px;
  font-weight: 200;
  margin-top: 8px;
  margin-bottom: 8px;
`

export const CVSection = styled(Box)`
  padding: 8px 8px 8px 0px!important;
`

export const CVRow = styled(Flex)`
  margin-bottom: 4px!important;
`

export const CVJobTitleRow = styled.div`
  flex-direction: row;
  flex-wrap: wrap;
  display: inline-block;
`


export const CVColumn = styled(Flex)`
  flex-direction: column;
  width: 100%;
`

export const CVEntryContainer = styled(Box)`
  padding-left: 0px;
  padding-right: 8px;
  padding-top: 16px;
`

export const CVDescriptionList = styled.ul`
  font-family: ${p=>p.theme.fonts.body};
  font-size: 15px;
  font-weight: 300;
  padding-left: 10px;
  list-style: none;
  padding-right: 10px;
  margin-top: 8px;
  margin-bottom: 8px;
`

export const CVDescriptionListItem = styled.li`
  font-size: 14px;
  line-height: 18px;
  padding-bottom: 8px;

`

const CVDatesDisplaySquare = styled.div`
  width: 3px;
  height: 1px;
  background-color: ${p => p.fillSquare ? p.theme.palette.highlightText : 'lightgray' };
  margin: 0px 1px;
  padding: 1px 1px;
`
  
const CVDatesDisplayYear = styled.div`
  font-family: ${p=>p.theme.fonts.title1};
  font-size: 12px;
  margin-top: ${p=>p.edge === 'top' ? 0 : 'auto' };
  margin-bottom: ${p=>p.edge === 'top' ? 'auto' : 0 };
  line-height: 0px;
  ${p => { return p.edge !== 'center' ? `
      :first-of-type {
        padding-top: 0;
        margin-top: -1px;
      }
      :last-of-type {
        padding-bottom: 0;
        margin-bottom: -1px;
      }
  ` : `
    margin-top: auto;
    margin-bottom: auto;
  `}}

`

const CVDatesDisplayRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1px;
  margin-bottom: 1px;
  :first-of-type {
    margin-top: 0px;
  }
  :last-of-type {
    margin-bottom: 0px;
  }
`

const CVDatesDisplayContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: auto!important;
  margin-bottom: auto;
  padding-top: 4px;
  padding-bottom: 4px;
  margin-top: 5px;
`

const CVDatesDisplayOuterContainer = styled.div`
  display: block;
  float: right;
  height: fit-content;
  margin-left: 4px;
  min-height: 30px;
`

const CVDatesBoxesContainer = styled(Flex)`
  flex-direction: column;
  padding: 1px 0;
`

const CVDatesYearColumn = styled(Flex)`
  display: flex;
  flex-direction: column;
  /* margin: unset!important; */
  padding-right: 5px;
`

// interface CVDatesDisplayInput {
//   startMonth: number
//   startYear: number
//   endMonth: number
//   endYear: number
// }

let months = [
  [1,"j","January"],
  [2,"f","February"],
  [3,"m","March"],
  [4,"a","April"],
  [5,"m","May"],
  [6,"j","June"],
  [7,"j","July"],
  [8,"a","August"],
  [9,"s","September"],
  [10,"o","October"],
  [11,"n","November"],
  [12,"d","December"]
]

export const CVDatesDisplay = ({startMonth, startYear, endMonth, endYear}) => {

  let years = []
  let [showMonths, setShowMonths] = useState(false);
  if (startYear === endYear) {
    years.push(startYear)
  } else {
    for (let i = startYear; i <= endYear; i++) {
      years.push(i)
    }
  }

  function getYearRow(monthStart, monthEnd) {


    return (
      <CVDatesDisplayRow key={Math.random().toString()}>
        { months.map((month,i) => (
          <CVDatesDisplaySquare key={month[2]+Math.random().toString()} fillSquare={!!(month[0] >= monthStart && month[0] <= monthEnd)}/>
        ))}
      </CVDatesDisplayRow>
    )
  }

  return (
    <CVDatesDisplayOuterContainer>
      <CVDatesDisplayContainer>
        <CVDatesYearColumn>
          <CVDatesDisplayYear edge={ years.length > 1 ? 'top' : 'center'}>{endYear}</CVDatesDisplayYear>
          { years.length > 1 && (
            <CVDatesDisplayYear key={Math.random().toString()} edge={'bottom'}>{startYear}</CVDatesDisplayYear>
          )}
        </CVDatesYearColumn>
        <CVDatesBoxesContainer>
          { years.reverse().map(year => {
            let monthA = 1;
            let monthB = 12;

            if (year === startYear)  {
              monthA = startMonth
            }

            if (year === endYear) {
              monthB = endMonth
            }

            return getYearRow(monthA, monthB)
          })}
        </CVDatesBoxesContainer>

      </CVDatesDisplayContainer>
    </CVDatesDisplayOuterContainer>
  )
}