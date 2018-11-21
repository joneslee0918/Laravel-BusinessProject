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