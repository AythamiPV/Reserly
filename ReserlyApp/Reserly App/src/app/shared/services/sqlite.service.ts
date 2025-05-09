import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';
import { Services } from '../interfaces/service.interface';

@Injectable({
  providedIn: 'root',
})
export class SQLiteService {
  private sqlite: SQLiteConnection;
  private db: SQLiteDBConnection | null = null;
  private isWeb: boolean = false;
  private readonly STORAGE_KEY = 'favorites';
  private readonly STORAGE_DB = 'favoritesDB';

  constructor(private platform: Platform) {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
    this.init();
  }

  private async init() {
    await this.platform.ready();
    this.isWeb = Capacitor.getPlatform() === 'web';
    if (this.isWeb) return;

    try {
      const db = await this.sqlite.createConnection(
        this.STORAGE_DB,
        false,
        'no-encryption',
        1,
        false
      );
      await db.open();
      this.db = db;
      await db.execute(`
          CREATE TABLE IF NOT EXISTS favorites (
            id TEXT PRIMARY KEY,
            name TEXT,
            description TEXT,
            price NUMBER,
            img TEXT
          );
        `);
    } catch (error) {
      console.error('Error opening SQLite database', error);
    }
  }

  async addFavorite(service: Services): Promise<void> {
    if (this.isWeb) {
      const favorites = await this.getFavorites();
      const exists = favorites.some((x) => x.id === service.id);
      if (exists) return;

      favorites.push(service);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
    } else if (this.db) {
      await this.db.run(
        `INSERT OR REPLACE INTO favorites (id, name, description, price, img) VALUES (?, ?, ?, ?, ?)`,
        [
          service.id,
          service.name,
          service.description,
          service.price,
          service.img,
        ]
      );
    }
  }

  async removeFavorite(id: string): Promise<void> {
    if (this.isWeb) {
      const favorites = await this.getFavorites();
      const updatedFavorites = favorites.filter((fav: any) => fav.id !== id);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedFavorites));
    } else if (this.db) {
      await this.db.run(`DELETE FROM favorites WHERE id = ?`, [id]);
    }
  }

  async getFavorites(): Promise<Services[]> {
    if (this.isWeb) {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    }

    if (!this.db) return [];

    const res = await this.db.query(`SELECT * FROM favorites`);
    return res.values ?? [];
  }
}
