export interface Database {
  id: number;
  name: string;
  status: string;
  type: string;
  created_at: string;
  db_name?: string;
  db_user?: string;
  db_password?: string;
  db_capacity?: number;
  db_host?: string;
  db_port?: number;
}

export interface Token {
  token: string;
}
