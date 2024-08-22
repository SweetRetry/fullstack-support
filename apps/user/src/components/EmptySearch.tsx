import React from "react";

const EmptySearch = () => {
  return (
    <svg
      width="180"
      height="180"
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_1_259)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M90 180C139.706 180 180 139.706 180 90C180 40.2944 139.706 0 90 0C67.6996 0 59.2227 26.7477 43.5 40.1802C24.1782 56.6875 0 62.5948 0 90C0 139.706 40.2944 180 90 180Z"
          fill="hsl(var(--muted))"
        />

        <g filter="url(#filter0_f_1_259)">
          <path
            d="M138 60H60C57.5147 60 55.5 61.7227 55.5 63.8478V144.652C55.5 146.777 57.5147 148.5 60 148.5H138C140.485 148.5 142.5 146.777 142.5 144.652V63.8478C142.5 61.7227 140.485 60 138 60Z"
            fill="hsl(var(--muted-foreground))"
          />
          <path
            d="M138 60H60C57.5147 60 55.5 61.7227 55.5 63.8478V144.652C55.5 146.777 57.5147 148.5 60 148.5H138C140.485 148.5 142.5 146.777 142.5 144.652V63.8478C142.5 61.7227 140.485 60 138 60Z"
            fill="hsl(var(--muted-foreground))"
          />
        </g>

        <path
          d="M52.5 60C52.5 53.3726 57.8726 48 64.5 48H121.5C128.127 48 133.5 53.3726 133.5 60V124.5C133.5 131.127 128.127 136.5 121.5 136.5H64.5C57.8726 136.5 52.5 131.127 52.5 124.5V60Z"
          fill="hsl(var(--muted))"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M126.991 131.803C128.539 130.427 128.679 128.057 127.303 126.509L115.303 113.009C113.927 111.461 111.557 111.321 110.009 112.697C108.461 114.073 108.321 116.443 109.697 117.991L121.697 131.491C123.073 133.039 125.443 133.179 126.991 131.803Z"
          fill="hsl(var(--muted-foreground))"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M99 81.75C90.3015 81.75 83.25 88.8015 83.25 97.5C83.25 106.198 90.3015 113.25 99 113.25C107.698 113.25 114.75 106.198 114.75 97.5C114.75 88.8015 107.698 81.75 99 81.75ZM75.75 97.5C75.75 84.6594 86.1594 74.25 99 74.25C111.841 74.25 122.25 84.6594 122.25 97.5C122.25 110.341 111.841 120.75 99 120.75C86.1594 120.75 75.75 110.341 75.75 97.5Z"
          fill="hsl(var(--muted-foreground))"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_1_259"
          x="39"
          y="43.5"
          width="120"
          height="121.5"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="8.25"
            result="effect1_foregroundBlur_1_259"
          />
        </filter>
        <clipPath id="clip0_1_259">
          <rect width="180" height="180" fill="hsl(var(--primary))" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default EmptySearch;
