import {NextRequest, NextResponse} from 'next/server';

export function middleware(req: NextRequest) {
    const host = req.headers.get('host') ?? '';
    const wwwRegex = /^www\./;

    if (wwwRegex.test(host)) {
        const newHost = host.replace(wwwRegex, '');
        return NextResponse.redirect(`https://${newHost}${req.nextUrl.pathname}`, 301);
    }

    return NextResponse.next();
}