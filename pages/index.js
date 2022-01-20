import Layout from "../components/Layout";
import { Select, Table, Tag, Space, Button } from "antd";
import io from "socket.io-client";
import { useEffect, useState } from "react";
const { Option } = Select;

export default function Home() {
	//VARIABLES
	const [data, setData] = useState([]);

	useEffect(() => {
		//SOCKETS
		const socket = io();
		socket.on("connect", () => {
			console.log(socket.id);
		});
		socket.on("new_card", (new_log) => {
			setData((data) => [new_log, ...data]);
		});
	}, []);

	//CHANGE IN VALUE
	const handleChange = (value) => {
		console.log(`selected ${value}`);
	};

	const columns = [
		{
			title: "PFID",
			dataIndex: "pfid",
			key: "pfid",
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Site",
			dataIndex: "site",
			key: "site",
		},
		{
			title: "Time & Date",
			dataIndex: "timestamp",
			key: "timestamp",
		},
	];

	return (
		<Layout>
			<Select
				mode="multiple"
				allowClear
				style={{ width: "100%" }}
				placeholder="Please select site(s)"
				onChange={handleChange}
			>
				<Option key={1}>Site 1</Option>
				<Option key={2}>Site 2</Option>
				<Option key={3}>Site 3</Option>
			</Select>
			<br />
			<br />
			<Table dataSource={data} columns={columns} />
		</Layout>
	);
}
