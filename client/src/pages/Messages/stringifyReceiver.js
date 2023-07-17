export default function stringifyReceiver(receiver) {
    return receiver.map(receiver => receiver.username).join(', ')
}