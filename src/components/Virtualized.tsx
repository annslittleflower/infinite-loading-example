
import React, { useState, useRef, useEffect } from "react"



interface VirtualizedProps {

}

const Virtualized = () => {
  const [startRow, setStartRow] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const visibleRows = 10
  const rowHeight = 50 // px

  // child function render


  const testData = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]

  const getTopHeight = () => {
    // not visible rows above the viewport
    return startRow * rowHeight
  }

  const getBottomHeight = () => {
    // not visible rows below the viewport
    return rowHeight * (testData.length - (startRow + visibleRows))
  }

  const onScroll = (e: Event ) => {
    const tgt = e.target as HTMLDivElement;
    setStartRow(Math.floor((tgt.scrollTop / rowHeight)) || 0)
  }

  useEffect(() => {
    let scrollRefLocal: HTMLDivElement;

    if (!scrollRef.current) {
      return;
    }  

    scrollRefLocal = scrollRef.current;
    
    scrollRefLocal.addEventListener('scroll', onScroll)
    
    return () => {
      scrollRefLocal.removeEventListener('scroll', onScroll)
    }
  }, [])

  console.log('awawd', testData.slice(startRow, startRow + visibleRows))

  return (
    <div style={{ height: rowHeight * visibleRows, overflow: 'auto', margin: '3rem' }} ref={scrollRef}>
      <div style={{ height: getTopHeight()}} />
      <div>
        {testData.slice(startRow, startRow + visibleRows)
          .map(el => <div style={{height: rowHeight}} key={el}>content {el}</div>)}
      </div>
      <div style={{ height: getBottomHeight()}} />
    </div>
  )
}

export default Virtualized