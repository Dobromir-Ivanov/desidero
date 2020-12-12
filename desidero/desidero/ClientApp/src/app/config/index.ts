import { environment } from 'src/environments/environment';
import { Utilities } from '../utilities';

export class Configuration {

  public static readonly baseUrl = environment.baseUrl || Utilities.baseUrl();

  public static readonly apiUrl = Configuration.baseUrl + '/api';

  public static readonly loginUrl = '/login';

  public static readonly homeUrl = '/home';

  public static readonly userUrl = '/wp-admin';

  public static readonly publicationUrl = `/publication`;

  public static readonly publicationDetialUrl = 'wp-admin/publication/detail';

}
