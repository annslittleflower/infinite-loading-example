import { useState } from "react"
import useClickOutside from '../hooks/useClickOutside'


export interface OptionType {
  label: string;
  value: string;
}
interface DropdownProps {
  options: OptionType[]
  title: string;
  onSelectOption: (o: OptionType) => void
}

const Dropdown = ({options, title, onSelectOption}: DropdownProps) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false)

  const menuRef = useClickOutside<HTMLDivElement>(() => {
    setIsMenuOpened(false)
  })

  return (
    <div className="dropdown_wrapper">
      <div
        ref={menuRef}
        className="dropdown"
        onClick={() => setIsMenuOpened(!isMenuOpened)}
      >
        {title}
      </div>
      {isMenuOpened ? (
        <div
          className="dropdown_menu"
        >
          {options.map(o => (
            <div
              className="dropdown_option"
              onClick={() => onSelectOption(o)}
            >
              {o.label}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default Dropdown
