import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

const FollowLink = ({ link, icon, className }) => {
  return (
    <Link href={link}>
      <a
        className={className}
        style={{
          borderRadius: "3px",
          color: "#fff",
          height: "28px",
          marginRight: "6px",
        }}
      >
        {icon}
      </a>
    </Link>
  );
};

FollowLink.propTypes = {
  link: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  className: PropTypes.string.isRequired,
};
export default FollowLink;
