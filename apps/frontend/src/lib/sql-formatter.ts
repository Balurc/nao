import { format } from 'sql-formatter';

export function formatSQL(sql: string): string {
	try {
		let formatted = format(sql, {
			language: 'postgresql',
			keywordCase: 'upper',
			indentStyle: 'standard',
			tabWidth: 2,
			linesBetweenQueries: 2,
		});

		// Post-process: put SELECT columns on separate lines
		// Find "SELECT col1, col2, col3" and make it:
		// SELECT
		//   col1,
		//   col2,
		//   col3
		formatted = formatted.replace(/SELECT\s+(.+?)\s+FROM/s, (match, columns) => {
			const cols = columns.split(',').map((c: string) => c.trim());
			return 'SELECT\n  ' + cols.join(',\n  ') + '\nFROM';
		});

		return formatted;
	} catch (error) {
		return sql;
	}
}
