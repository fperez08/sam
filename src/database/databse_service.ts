import type {SaleItem} from '../models/sams_data_models';
import {Database} from 'bun:sqlite';
class DataBaseService {
  private db: Database;
  constructor() {
    this.db = new Database(process.env.DB_PATH);
  }

  /**
   * Inserts or replaces a record in the sales table.
   * @param id the record id
   * @param data the record data
   */
  public storeSalesData(id: number, data: SaleItem[]) {
    try {
      this.db.run('INSERT OR REPLACE INTO sales (id, data) VALUES (?, ?)', [
        id,
        JSON.stringify(data),
      ]);
    } catch (error) {
      console.error((error as Error).message);
      throw error;
    }
  }
}

export const DBService = new DataBaseService();
