import React from 'react'

export default function Profile_img_edit() {
  return (
    <div className="profile-img-edit">

      <div className='profile-img'>
        <img src={profileImg} alt="Profile" />
        </div>
        <div className='profile-bio'>
          <p> This is Bio</p>
          </div>

      </div>
  )
}
