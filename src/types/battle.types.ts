import { ErrorT } from "./popular.types"
import { IRepos } from "./popular.types"

export interface IBattleStore{
    playerData: {
        playerOneName: string,
        playerTwoName: string,
        playerOneImage: string | null,
        playerTwoImage: string | null,
      },
      battle: {
          winner: IRepos[] | null,
          loser: IRepos[] | null,
        },
      loading: boolean,
      error:ErrorT
}



