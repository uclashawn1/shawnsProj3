import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({
  profile: {
    interests,
    user: { name }
  }
}) => (
  <div className='profile-about bg-light p-2'>
    {interests && (
      <Fragment>
        <h2 className='text-primary'>{name.trim().split(" ")[0]}s Interests</h2>
        <p>{interests}</p>
        <div className='line' />
      </Fragment>
    )}
    <h2 className='text-primary'>Interests</h2>
    <div className='interests'>
      {interests.map((interest, index) => (
        <div key={index} className='p-1'>
          <i className='fas fa-check' /> {interest}
        </div>
      ))}
    </div>
  </div>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
