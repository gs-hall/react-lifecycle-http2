import React from "react";
import { Oval } from 'react-loader-spinner';
import Icon from "./Icon";

export default function LoadingButton({type, isLoading, icon, color, className, onClick}) {
  return (
    <button onClick={onClick} className={className} type={type} disabled={isLoading} >
      {!isLoading &&
        <Icon icon={icon} addClassName={className} />
      }
      {isLoading &&
        <Oval
          height={10}
          width={10}
          color={color}
          secondaryColor={color}
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel='oval-loading'
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      }
    </button>
  );
};