import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { User } from '../model';
import { fake_data_services } from './data';
import { USER_URL } from '../constant';
import { getData } from '../services';

describe('getData', () => {
  const mockData: User[] = fake_data_services; 

  it('should fetch data successfully', async () => {
    const mock = new MockAdapter(axios);
    mock.onGet(USER_URL).reply(200, mockData);

    const result = await getData(USER_URL);

    expect(result).toEqual(mockData);
  });

  it('should handle error when fetching data', async () => {
    const mock = new MockAdapter(axios);
    mock.onGet(USER_URL).networkError();

    await expect(getData(USER_URL)).rejects.toThrowError();
  });
});