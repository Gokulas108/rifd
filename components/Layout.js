import { Layout, Menu } from "antd";
import {
	AppstoreOutlined,
	BarChartOutlined,
	CloudOutlined,
	ShopOutlined,
	TeamOutlined,
	UserOutlined,
	UploadOutlined,
	VideoCameraOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;
import React from "react";
React.useLayoutEffect = React.useEffect;

const LayoutComponent = ({ children }) => {
	return (
		<div>
			<Layout>
				<Sider
					style={{
						overflow: "auto",
						height: "100vh",
						position: "fixed",
						left: 0,
					}}
				>
					<div className="logo">logo</div>
					<Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
						<Menu.Item key="1" icon={<UserOutlined />}>
							Attendance Log
						</Menu.Item>
						<Menu.Item key="2" icon={<VideoCameraOutlined />}>
							Manage Cards
						</Menu.Item>
						{/* <Menu.Item key="3" icon={<UploadOutlined />}>
							nav 3
						</Menu.Item>
						<Menu.Item key="4" icon={<BarChartOutlined />}>
							nav 4
						</Menu.Item>
						<Menu.Item key="5" icon={<CloudOutlined />}>
							nav 5
						</Menu.Item>
						<Menu.Item key="6" icon={<AppstoreOutlined />}>
							nav 6
						</Menu.Item>
						<Menu.Item key="7" icon={<TeamOutlined />}>
							nav 7
						</Menu.Item>
						<Menu.Item key="8" icon={<ShopOutlined />}>
							nav 8
						</Menu.Item> */}
					</Menu>
				</Sider>
				<Layout className="site-layout" style={{ marginLeft: 200 }}>
					<Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
						<div className="site-layout-background" style={{ padding: 24 }}>
							{children}
						</div>
					</Content>
					<Footer style={{ textAlign: "center" }}>ALTRAD CAPE ©2022</Footer>
				</Layout>
			</Layout>
		</div>
	);
};

export default LayoutComponent;
