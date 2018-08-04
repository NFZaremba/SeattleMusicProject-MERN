import React from "react";
import { Header, Icon, Image, Menu, Segment, Sidebar } from "semantic-ui-react";

const SidebarExampleVisible = () => (
  <Sidebar.Pushable>
    <Sidebar
      as={Menu}
      animation="overlay"
      icon="labeled"
      inverted
      vertical
      visible
      width="wide"
    >
      <Menu.Item as="a">
        <Icon name="home" />
        Home
      </Menu.Item>
      <Menu.Item as="a">
        <Icon name="gamepad" />
        Games
      </Menu.Item>
      <Menu.Item as="a">
        <Icon name="camera" />
        Channels
      </Menu.Item>
    </Sidebar>
  </Sidebar.Pushable>
);

export default SidebarExampleVisible;
