import {Pool} from 'pg';
import type {SaleItem} from '../models/sams_data_models';
class DataBaseService {
  private pool: Pool;
  constructor() {
    this.pool = new Pool({
      user: process.env.DB_USER,
      host: 'localhost',
      database: 'sam',
      password: process.env.DB_PASSWORD,
      port: 5432,
    });
  }

  public async storeData(id: string, data: SaleItem[]) {
    const client = await this.pool.connect();
    try {
      await client.query('INSERT INTO sams_sales (id, data) VALUES ($1, $2)', [
        id,
        JSON.stringify(data),
      ]);
      console.log('Data stored successfully!');
    } catch (error) {
      console.error('Error storing data:', error);
    } finally {
      client.release();
    }
  }
}

export const DBService = new DataBaseService();
