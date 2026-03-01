import { format } from 'sql-formatter';

export function formatSQL(sql: string): string {
	try {
		return format(sql, {
			language: 'postgresql',
			keywordCase: 'upper',
			indentStyle: 'standard',
			tabWidth: 2,
			linesBetweenQueries: 2,
		});
	} catch (error) {
		return sql;
	}
}
