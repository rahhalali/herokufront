import React from 'react'

function ProfileReport({profile}) {
    
    return (
        <div className="item-a-inner">
          <img src="" alt="image" width="100%"/>
          <p className="Paragraph">Ali Rahhal</p>
          <p className="PARA">
            <span style={{ marginRight: "20px", color: "darkgreen" }}>
              <i class="fas fa-phone-alt fa-2x"></i>
            </span>
            0096170146434
          </p>
          <p className="PARA">
            <span style={{ marginRight: "20px", color: "dark" }}>
              <i class="fas fa-envelope fa-2x"></i>
            </span>
            Ali rahhal@hotmail.com
          </p>
        </div>
    )
}

export default ProfileReport
