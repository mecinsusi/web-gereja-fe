function bigIntReplacer(_key: string, value: any): any {
  return typeof value === 'bigint' ? Number(value) : value;
}
