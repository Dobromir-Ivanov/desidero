import { environment } from 'src/environments/environment';
import { Utilities } from '../utilities';

export class Configuration {

  public static readonly baseUrl = environment.baseUrl || Utilities.baseUrl();

  public static readonly loginUrl = '/login';

  public static readonly homeUrl = '/home';

  public static readonly userUrl = '/m';

  public static readonly apiUrl = Configuration.baseUrl + '/api';

}
