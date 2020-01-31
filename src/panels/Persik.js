import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { platform, IOS } from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import connect from '@vkontakte/vk-connect';


import persik from '../img/persik.png';
import './Persik.css';

const osName = platform();

const Persik = props => {
	const [qrCode, setQRcode] = useState(null);
	const [qrCodeFetched, setQRCodeFetched] = useState(false);
	useEffect(() => {
		async function fetchData() {
			let getQRCodeResult = null;
			try {
				getQRCodeResult = await connect.send('VKWebAppOpenCodeReader', {});
				setQRCodeFetched(true);
			} catch (e) {
				//getEmailResult = 'запретил'
			}
			setQRcode(getQRCodeResult ? getQRCodeResult.code_data : 'Не удалось получить');
		}
		fetchData();
	}, []);

	return (
		<Panel id={props.id}>
			<PanelHeader
				left={<HeaderButton onClick={props.go} data-to="home">
					{osName === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
				</HeaderButton>}
			>
				Persik
			</PanelHeader>
			{qrCodeFetched && <Div>
				QR Code: {qrCode}

				<img className="Persik" src={persik} alt="Persik The Cat" /></Div>}
		</Panel>
	);
}

Persik.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Persik;
