import { environment } from 'src/environments/environment';
import { Utilities } from '../utilities';

export class Configuration {

  public static readonly baseUrl = environment.baseUrl || Utilities.baseUrl();

  public static readonly apiUrl = Configuration.baseUrl + '/api';

  public static readonly loginUrl = '/login';

  public static readonly homeUrl = '/home';

  public static readonly wpAdminUrl = '/wp-admin/';

  public static readonly usersListUrl = '/wp-admin/user/list';

  public static readonly userEditUrl = '/wp-admin/user/edit/';

  public static readonly userDetailUrl = '/wp-admin/user/detail/';

  public static readonly publicationDetialUrl = 'wp-admin/publication/detail';

  public static readonly publicationListUrl = 'wp-admin/publication/list';

}
