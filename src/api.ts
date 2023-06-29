import axios, { AxiosResponse } from 'axios';

interface Profile {
  followers: number;
}

interface Repository {
  stargazers_count: number;
}

interface UserData {
  profile: Profile;
  score: number;
}

const handleError = (error: Error): never => {
  throw new Error(error.message);
};

const getProfile = (username: string): Promise<Profile> => {
  return axios
    .get(`https://api.github.com/users/${username}`)
    .then((user: AxiosResponse<Profile>) => user.data)
    .catch(handleError);
};

const getRepos = (username: string): Promise<Repository[]> => {
  return axios
    .get(`https://api.github.com/users/${username}/repos`)
    .then((user: AxiosResponse<Repository[]>) => user.data)
    .catch(handleError);
};

const getStarCount = (repos: Repository[]): number => {
  return repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
};

const calculateScore = (profile: Profile, repos: Repository[]): number => {
  const followers = profile.followers;
  const totalStar = getStarCount(repos);

  return followers + totalStar;
};

export const getUserData = async (
  username: string
): Promise<UserData> => {
  const profile = await getProfile(username);
  const repos = await getRepos(username);

  return {
    profile,
    score: calculateScore(profile, repos),
  };
};

const sortPlayer = (players: UserData[]): UserData[] => {
  return players.sort((a, b) => b.score - a.score);
};

export const makeBattle = async (
  players: string[]
): Promise<UserData[]> => {
  const userDataPromises = players.map(getUserData);
  const userData = await Promise.all(userDataPromises);

  return sortPlayer(userData);
};

interface PopularRepo {
  name: string;
  stargazers_count: number;
}

export const fetchPopularRepos = async (
  language: string
): Promise<PopularRepo[]> => {
  const response = await axios.get(
    `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=desc&type=Repositories`
  );
  return response.data.items;
};



