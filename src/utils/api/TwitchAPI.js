export const getStreams = async (channel) => {
    
    let data = await fetch("/.netlify/functions/index/streamer/" + channel);

    if(data.ok) {
        return await data.json();
    }
    return {data: []};
}