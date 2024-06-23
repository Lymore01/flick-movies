import React from 'react'

const Loader = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-current text-[orangered]" // Use Tailwind classes to apply colors
    >
      <rect x="0" y="0" width="4" height="7" className="fill-[orangered]">
        <animateTransform
          attributeName="transform"
          type="scale"
          values="1,1; 1,3; 1,1"
          begin="0s"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </rect>

      <rect x="10" y="0" width="4" height="7" className="fill-[orangered]">
        <animateTransform
          attributeName="transform"
          type="scale"
          values="1,1; 1,3; 1,1"
          begin="0.2s"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </rect>

      <rect x="20" y="0" width="4" height="7" className="fill-[orangered]">
        <animateTransform
          attributeName="transform"
          type="scale"
          values="1,1; 1,3; 1,1"
          begin="0.4s"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  )
}

export default Loader