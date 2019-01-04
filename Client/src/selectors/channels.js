import boardSelector from "./boards";

export default (channels = [], {selected, provider, publishable}) => {

    if(!channels.length) return channels;

    return channels.filter((channel) => {
        let filter = true;

        if(provider){
            filter = channel.type == provider;
        }

        if(publishable){

            if(typeof channel.details.account_type !== "undefined"){
                filter = filter && channel.details.account_type !== "profile";
            }
        }

        if(!isNaN(selected)){
            if(provider){
                filter = filter && channel.details.selected == selected;
            }else{
                filter = filter && channel.selected == selected;
            }
        }

        return filter;
    });
};

//qitu jom met me pinterest channels kur pe selekton bordin spo bon kajhere
export const publishChannels = (channels = []) => {
    return channels.map((channel) => {
        if(channel.selected && channel.type == "pinterest" && (typeof(channel.boards) === "undefined" || boardSelector(channel.boards, {selected: 1}).length < 1)){
            return {
                ...channel,
                selected: 0
            }
        }else{
            return {
                ...channel
            }
        }
    });
};