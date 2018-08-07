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
      width="thin"
    >
      <Menu.Item as="a" href="/artist">
        <Icon name="home" />
        Artists
      </Menu.Item>
      <Menu.Item as="a" href="/events">
        <Icon name="gamepad" />
        Events
      </Menu.Item>
      <Menu.Item as="a">
        <Icon name="camera" />
        Post Feed
      </Menu.Item>
      <Menu.Item as="a">
        <Icon name="camera" />
        Dashboard
      </Menu.Item>
      <Menu.Item as="a">
        <Icon name="camera" />
        Logout
      </Menu.Item>
    </Sidebar>
  </Sidebar.Pushable>
);

export default SidebarExampleVisible;
