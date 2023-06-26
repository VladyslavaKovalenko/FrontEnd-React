import axios from 'axios'

const handleError = (error)=>{
    throw new Error(error)
}

const getProfile =(username)=>{
    return axios.get(`https://api.github.com/users/${username}`)
    .then(user=>user.data)
    .catch(handleError)
}

const getRepos=(username)=>{
    return axios.get(`https://api.github.com/users/${username}/repos`)
    .then(user=>user.data)
    .catch(handleError)
}

const getStarCount =(repos)=>{
    return repos.reduce((acc, repo)=>acc+repo.stargazers_count, 0)
}

const calculateScore=(profile, repos)=>{
    const followers =profile.followers
    const totalStar = getStarCount(repos)

    return followers+totalStar
}

export const getUserData=(username)=>{
    return Promise.all([
        getProfile(username),
        getRepos(username)
    ]) .then(([profile, repos])=>{
        return{
            profile,
            score: calculateScore(profile, repos)
        }
    })
    .catch(handleError)
}


const sortPlayer=(players)=>{
    return players.sort((a, b)=> b.score-a.score)
}

 export const makeBattle =(players)=>{
    return Promise.all(players.map(getUserData))
    .then(sortPlayer)
    .catch(handleError)
}

export const fetchPopularrepos = (language)=>{
    return axios.get(window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=desc&type=Repositories`))
    .then(response=>response.data.items)
    .catch(error=>{
        throw new Error(error)
    })   
}