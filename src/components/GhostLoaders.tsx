import { getGridChildClassNameByIndex } from '../utils/grid'
import { classNames } from '../utils/classnames';

interface GhostLoadersProps {
  count: number
}

const GhostLoaders = ({count}: GhostLoadersProps) => {
  return (
    <>
      {
        Array.from(Array(count).keys())
          .map(index =>
            <div key={index} className={classNames(['ghost-loader', getGridChildClassNameByIndex(index)])} />
          )
      }
    </>
  )
}

export default GhostLoaders