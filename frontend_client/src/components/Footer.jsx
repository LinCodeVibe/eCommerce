import {
	Button,
	ButtonGroup,
	Container,
	Divider,
	IconButton,
	Input,
	Stack,
	Text,
	useColorModeValue as mode,
	Box,
	Flex,
	Icon,
} from '@chakra-ui/react';
import { FaInstagramSquare, FaFacebook } from 'react-icons/fa';
import { FaLine } from 'react-icons/fa6';
import { GiWineBottle } from 'react-icons/gi';
import { MdEmail } from 'react-icons/md';

const Footer = () => (
	<Box w='100%' bg={mode('purple.200', 'purple.900')}>
		<Container as='footer' maxW='7xl'>
			<Stack
				spacing='8'
				direction={{ base: 'column', md: 'row' }}
				justify='space-between'
				py={{ base: '12', md: '16' }}
			>
				<Stack spacing={{ base: '6', md: '8' }} align='start'>
					<Flex alignItems='center'>
						<Icon as={GiWineBottle} h='10' w='10' color={mode('black')} />
						<Text fontSize='2xl' frontWeight='extrabold'>
							E-Commerce
						</Text>
					</Flex>
					<Text color='muted'> Select you like!</Text>
				</Stack>
				<Stack direction={{ base: 'column-reverse', md: 'column', lg: 'row' }} spacing={{ base: '12', md: '8' }}>
					<Stack direction='row' spacing='8'>
						<Stack spacing='4' minW='36' flex='1'>
							<Text fontSize='sm' fontWeight='semibold' color='subtle'>
								Help & Contact
							</Text>
							<Stack spacing='3' shouldWrapChildren>
								<Button variant='link'>About us</Button>
								<Button variant='link'>Contact us</Button>
							</Stack>
						</Stack>
						<Stack spacing='4' minW='36' flex='1'>
							<Text fontSize='sm' fontWeight='semibold' color='subtle'>
								Legal
							</Text>
							<Stack spacing='3' shouldWrapChildren>
								<Button variant='link'>Privacy</Button>
								<Button variant='link'>Terms</Button>
								<Button variant='link'>License</Button>
							</Stack>
						</Stack>
					</Stack>
					<Stack spacing='4'>
						<Text fontSize='sm' fontWeight='semibold' color='subtle'>
							Stay up to date
						</Text>
						<Stack spacing='4' direction={{ base: 'column', sm: 'row' }} maxW={{ lg: '360px' }}>
							<Input placeholder='Enter your email' type='email' required />
							<Button variant='primary' type='submit' flexShrink='0'>
								Subscribe
							</Button>
						</Stack>
					</Stack>
				</Stack>
			</Stack>

			<Divider />
			<Stack pt='8' pb='12' justify='space-between' direction={{ base: 'column-reverse', md: 'row' }} align='center'>
				<ButtonGroup variant='ghost'>
					<IconButton as='a' href='#' icon={<FaInstagramSquare fontSize='1.68em' />} />
					<IconButton as='a' href='#' icon={<FaLine fontSize='1.68em' />} />
					<IconButton as='a' href='#' icon={<FaFacebook fontSize='1.68em' />} />
					<IconButton as='a' href='#' icon={<MdEmail fontSize='1.68em' />} />
				</ButtonGroup>
				<Text fontSize='sm' color='subtle'>
					&copy; {new Date().getFullYear()} E-Commerce, Inc. All right reserved.
				</Text>
			</Stack>
		</Container>
	</Box>
);

export default Footer;
