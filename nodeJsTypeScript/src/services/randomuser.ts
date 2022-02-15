import axios from "axios";
import { RandomUserType } from '../RandomUserType';
import { User } from '../Models/User'

class RandomUser {
  static async getOne() {
    let reponse = await axios.get("https://randomuser.me/api/");

    let user = reponse.data.results[0] as RandomUserType;

    console.log(user.location.coordinates);
  }
}

export default RandomUser;