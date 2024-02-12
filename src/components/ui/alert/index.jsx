import { useEffect, useState } from 'react';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { VscError } from "react-icons/vsc";
import { ImWarning } from "react-icons/im";
import { FiInfo } from "react-icons/fi";
import classNames from 'classnames';
import './styles.scss';

const SHOW_ALERT = 2000;

const Alert = ({ title, message, status = 'success' }) => {
  const [isShow, setIsShow] = useState(true);

  const iconStatus = {
    info: <FiInfo />,
    error: <VscError />,
    warning: <ImWarning />,
    success: <IoMdCheckmarkCircleOutline />,
  };

  useEffect(() => {
    if(isShow) {
      setTimeout(() => {
        setIsShow(false)
      }, SHOW_ALERT);
    }
  }, [isShow]);

  return (
    <div
    role='alert'
      className={classNames(`alert alert-${status}`, { hidden: !isShow })}
    >
      <div className='alert__content'>
        <div className='alert__content-icon'>{iconStatus[status]}</div>
        <div className='alert__content-text'>
          {title && <h4 className='alert__content-title'>{title}</h4>}
          <p className='alert__content-subtitle'>{message}</p>
        </div>
      </div>
      <button
        className='alert__close-btn'
        onClick={() => setIsShow(false)}
      >
        x
      </button>
    </div>
  );
};

export default Alert;
