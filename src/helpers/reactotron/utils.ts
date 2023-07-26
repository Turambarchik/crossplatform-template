import {IObjectDidChange} from 'mobx';
import reactotron from 'reactotron-react-native';

export const tronChange = (change: IObjectDidChange) => {
  reactotron.display!({
    name: `STATE ${change.type.toUpperCase()}`,
    // @ts-ignore
    value: {type: change.type, name: change.name, from: change?.oldValue, to: change.object[change.name]},
    // @ts-ignore
    preview: `${String(change?.name)}: ${String(change?.oldValue || 'undefined')} => ${change.object[change.name]}`,
    important: false,
  });
};
