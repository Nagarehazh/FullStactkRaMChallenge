import { Request, Response, NextFunction } from 'express';

export function requestLogger(req: Request, res: Response, next: NextFunction): void {
    if (req.method === 'OPTIONS' || req.headers.origin?.includes('studio.apollographql.com')) {
        return next();
    }

    const { method, url, headers, body } = req;

    console.log(`
    [Request Info]
    Method: ${method}
    URL: ${url}
    Headers: ${JSON.stringify(headers)}
    Body: ${JSON.stringify(body)}
  `);

    next();
}