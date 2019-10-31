import {ResponseBody} from './responseBody';

export interface Response extends ResponseBody {
  status: number;
  body: ResponseBody;
}