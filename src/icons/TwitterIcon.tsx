import React from 'react';

const TwitterIcon: React.FC<React.SVGAttributes<SVGElement>> = ({ width = '24', height = '24' }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16.3817 6.15419C15.8893 6.34995 15.3602 6.48226 14.8049 6.54177C15.3717 6.23713 15.807 5.75476 16.012 5.18001C15.4815 5.46205 14.894 5.6669 14.2686 5.77731C13.7678 5.29894 13.0543 5 12.2647 5C10.7484 5 9.51919 6.10205 9.51919 7.46135C9.51919 7.65426 9.54351 7.84213 9.59031 8.02227C7.30858 7.91963 5.28564 6.9397 3.93156 5.45055C3.69525 5.81409 3.55986 6.23691 3.55986 6.68799C3.55986 7.54192 4.04458 8.29532 4.78124 8.7367C4.33117 8.72393 3.90787 8.61321 3.53769 8.42886C3.53749 8.43912 3.53749 8.44944 3.53749 8.45979C3.53749 9.65238 4.48384 10.6472 5.73977 10.8733C5.50938 10.9296 5.26684 10.9596 5.01643 10.9596C4.83954 10.9596 4.66753 10.9442 4.49994 10.9155C4.84928 11.8934 5.86317 12.605 7.06453 12.6249C6.12494 13.285 4.94115 13.6785 3.65491 13.6785C3.43333 13.6785 3.21478 13.6669 3 13.6442C4.21497 14.3425 5.65808 14.75 7.20848 14.75C12.2583 14.75 15.0197 10.9994 15.0197 7.74677C15.0197 7.64005 15.017 7.53389 15.0118 7.42835C15.5481 7.08132 16.0136 6.64779 16.3817 6.15419Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default TwitterIcon;

