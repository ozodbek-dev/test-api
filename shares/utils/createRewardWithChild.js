module.exports =  function createRewardWithChild(rewards, parentId=null){
    const rewardsList = [];
    let reward;
    if(parentId === null){
        reward = rewards.filter(rew=>rew.parentId == undefined);
    }else{
        reward = rewards.filter(rew=>rew.parentId == parentId);
    }

    for(let rew of reward){
        rewardsList.push({
            _id:rew._id,
            name:rew.name,
            children:createRewardWithChild(rewards,rew._id)
        })
    }

    return rewardsList;
}