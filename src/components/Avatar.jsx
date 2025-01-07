import React from "react";
import * as Avatars from "@dicebear/avatars";
import identicon from "@dicebear/avatars-identicon-sprites";

const Avatar = ({ username }) => {
  // Generate the avatar using the username as the seed
  const avatar = Avatars.create(identicon, {
    seed: username, // Use the username to generate a unique avatar
    size: 150, // You can adjust the size as needed
  });

  return (
    <div>
      <img src={`data:image/svg+xml;utf8,${avatar}`} alt={`${username}'s Avatar`} />
    </div>
  );
};

export default Avatar;
