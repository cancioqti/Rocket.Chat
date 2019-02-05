import { Users, Rooms } from 'meteor/rocketchat:models';

export default function handleJoinedChannel(args) {
	const user = Users.findOne({
		'profile.irc.nick': args.nick,
	});

	if (!user) {
		throw new Error(`Could not find a user with nick ${ args.nick }`);
	}

	let room = Rooms.findOneByName(args.roomName);

	if (!room) {
		const createdRoom = RocketChat.createRoom('c', args.roomName, user.username, []);
		room = Rooms.findOne({ _id: createdRoom.rid });

		this.log(`${ user.username } created room ${ args.roomName }`);
	} else {
		RocketChat.addUserToRoom(room._id, user);

		this.log(`${ user.username } joined room ${ room.name }`);
	}
}
