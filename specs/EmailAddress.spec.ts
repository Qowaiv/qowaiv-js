import { describe, expect, it, test } from 'vitest';
import { EmailAddress, Unparsable } from '../src';

describe('Email address', () => {

    test.each([
        ' ',
        '\t',
        '',
        null,
        undefined,
    ])('parses %s as undefined', (s) => {
        const svo = EmailAddress.parse(s!);
        expect(svo).toBeUndefined();
    });

    describe('length', () => {
        test.each(
            [
                'the-total-length@of-an-entire-address.cannot-be-longer-than-two-hundred-and-fifty-four-characters.and-this-address-is-254-characters-exactly.so-it-should-be-valid.and-im-going-to-add-some-more-words-here.to-increase-the-length-blah-blah-blah-blah-bla.org',
                'i234567890_234567890_234567890_234567890_234567890_234567890_234@long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long',
                'Display name is ignored <i234567890(comments are ignored)_234567890_234567890_234567890_234567890_234567890_234@long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long>',
            ])
            ('not more than 254 (%s)', (s) => {

                const svo = EmailAddress.parse(s);
                expect(svo?.length).toBe(254);
            });

        it('not 255 or longer', () => {
            const svo = EmailAddress.tryParse('i234567890_234567890_234567890_234567890_234567890_234567890_234@long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long.long1');
            expect(svo).toBeInstanceOf(Unparsable);
        })
    });

    describe('local part', () => {
        test.each(Array.from(
            "0123456789" +
            "abcdefghijklmnopqrstuvwxyz" +
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
            "!#$%&'*+-/=?^_`{}|~"))
            ('char %s is without limitations', (c) => {

                const s = c + c + c + '@qowaiv.org';
                const svo = EmailAddress.tryParse(s);
                expect(svo?.toString()).toBe(s);
            });

        test.each([1, 2, 17, 64])
            ('local with length %s', (len) => {

                const s = Create.string('a', len) + '@qowaiv.org';
                const svo = EmailAddress.tryParse(s);
                expect(svo).toBeDefined();
            });

        test.each([1, 2, 17, 62])
            ('quoted local with length %s', (len) => {

                const s = '"' + Create.string('a', len) + '"@qowaiv.org';
                const svo = EmailAddress.tryParse(s);
                expect(svo?.toString()).toBe(s);
            });

        it('dot can separate parts', () => {
            const svo = EmailAddress.parse('zero.one.two.three.four.five.6.7.8.9@qowaiv.org');
            expect(svo?.toString()).toBe('zero.one.two.three.four.five.6.7.8.9@qowaiv.org');
        });

        test.each([
            '" "@qowaiv.org',
            '"info@qowaiv.org"@qowaiv.org',
            '"i n f o"@qowaiv.org',
        ])
            ('Qouted %s allows everything', (s) => {
                const svo = EmailAddress.tryParse(s);
                expect(svo?.toString()).toBe(s);
            });

        it('may contain emojis', () => {
            const svo = EmailAddress.tryParse('❤️@qowaiv.org');
            expect(svo?.toString()).toBe('❤️@qowaiv.org');
        })
    });

    describe('domain part', () => {

        test.each([1, 2, 17, 63])
            ('part can have length %s', (len) => {

                const s = 'info@' + Create.string('a', len) + '.org';
                const svo = EmailAddress.tryParse(s);
                expect(svo?.toString()).toBe(s);
            });

        test.each([2, 17, 63])
            ('top domain part can have length %s', (len) => {

                const s = 'info@' + Create.string('a', len);
                const svo = EmailAddress.tryParse(s);
                expect(svo?.toString()).toBe(s);
            });

        it('is lowercased', () => {
            const svo = EmailAddress.parse('INFO@qoWAIV.Org');
            expect(svo?.toString()).toBe('INFO@qowaiv.org');
        });

        test.each(Array.from("!#$%&'*+/=?^`{}|~"))
            ('%s is not allowed', (ch) => {

                const svo = EmailAddress.tryParse(`info@${ch}.org`);
                expect(svo).toBeInstanceOf(Unparsable);
            });

        test.each([
            'org',
            'com',
            'museum',
            'topleveldomain',
            'co.jp'
        ])
            ('topdomain %s can contain any letter', (top) => {
                const s = `info@qowaiv.${top}`;
                const svo = EmailAddress.tryParse(s);
                expect(svo?.toString()).toBe(s);
            });

        test.each(
            [
                "xn--bcher-kva8445foa",
                "xn--eckwd4c7cu47r2wf", "xn--3e0b707e"
            ])
            ('topdomain % can be punycode', (punycode) => {

                const s = `info@${punycode}`;
                const svo = EmailAddress.parse(s);
                expect(svo?.toString()).toBe(s);
            });

        it('dot can separate parts', () => {
            const svo = EmailAddress.parse('info@one.two.three.4.5.qowaiv.org');
            expect(svo?.toString()).toBe('info@one.two.three.4.5.qowaiv.org');
        });

        it('dot is optional', () => {
            const svo = EmailAddress.parse('info@qowaiv');
            expect(svo?.toString()).toBe('info@qowaiv');
        });

        it('dash can separate parts', () => {
            const svo = EmailAddress.parse('info@one-two-three-4-5-qowaiv.org');
            expect(svo?.toString()).toBe('info@one-two-three-4-5-qowaiv.org');
        });
    });

    describe('display name', () => {

        test.each(
            [
                'Joe Smith <info@qowaiv.org>',
                'Test |<gaaf <info@qowaiv.org>',
            ])
            ('supports %s with brackets', (s) => {
                const svo = EmailAddress.tryParse(s);
                expect(svo?.toString()).toBe('info@qowaiv.org');
            });

        test.each(
            [
                '"Joe Smith" info@qowaiv.org',
                '"Joe Smith"   info@qowaiv.org',
                '"Joe Smith"\tinfo@qowaiv.org',
                '"Joe\\tSmith" info@qowaiv.org',
                '"Joe\\"Smith" info@qowaiv.org',
            ])
            ('supports %s with quotes', (s) => {
                const svo = EmailAddress.tryParse(s);
                expect(svo?.toString()).toBe('info@qowaiv.org');
            });

        test.each([
            'info@qowaiv.org (Joe Smith)',
            'info@qowaiv.org\t(Joe Smith)',
            'info@qowaiv.org  (Joe Smith)',
        ])
            ('supports %s with comments afterwards', (s) => {
                const svo = EmailAddress.tryParse(s);
                expect(svo?.toString()).toBe('info@qowaiv.org');
            });
    });

    describe('comments', () => {

        test.each(
            [
                'info@qowaiv.org(afterwards)',
                '(before)info@qowaiv.org',
                'in(local part)fo@qowaiv.org',
                'info@qow(domain part)aiv.org',
                'in(with @)fo@qowaiv.org',
                'info@qow(with @)aiv.org',
                'info(direct)(attached)@qowaiv.org',
                'in(multiple 1)fo@qow(multiple 2)aiv.or(multiple 3)g',
            ])
            ('are ignored in %s', (s) => {
                const svo = EmailAddress.tryParse(s);
                expect(svo?.toString()).toBe('info@qowaiv.org');
            });
    });

    describe('mailto: prefix', () => {
        test.each(
            [
                "mailto:",
                "MailTo:",
                "MAILTO:",
            ])
            ('case insensitive %s', (prefix) => {
                const svo = EmailAddress.tryParse(prefix + 'info@qowaiv.org');
                expect(svo?.toString()).toBe('info@qowaiv.org');
            });

        it('combined with comment', () => {
            const svo = EmailAddress.tryParse('mailto:info(with comment)@qowaiv.org')
            expect(svo?.toString()).toBe('info@qowaiv.org');
        });

        it('with quoted', () => {
            const svo = EmailAddress.tryParse('mailto:"quoted"@qowaiv.org')
            expect(svo?.toString()).toBe('"quoted"@qowaiv.org');
        });

        it('in quoted', () => {
            const svo = EmailAddress.tryParse('mailto:"mailto:quoted"@qowaiv.org')
            expect(svo?.toString()).toBe('"mailto:quoted"@qowaiv.org');
        });
    });

    describe('escaping', () => {

        test.each([
            '" "@qowaiv.org',
            '"quoted"@qowaiv.org',
            '"quoted-at-sign@sld.org"@qowaiv.org',
            '"very.(),:;<>[]\\".VERY.\\"very@\\\\ \\"very\\".unusual"@qowaiv.org',
            '"()<>[]:,;@\\\\\\"!#$%&\'*+-/=?^_`{}| ~.a"@qowaiv.org',
            '"\\e\\s\\c\\a\\p\\e\\d"@qowaiv.org',
        ])
            ('escapes %s', (s) => {
                const svo = EmailAddress.tryParse(s);
                expect(svo).toBeDefined();
            });
    });

    describe('Different alphabets', () => {
        test.each([
            "伊昭傑@郵件.商務",
            "θσερ@εχαμπλε.ψομ",
            "राम@मोहन.ईन्फो",
            "あいうえお@あいうえお.com",
            "юзер@екзампл.ком",
            "あいうえお@domain.com",
            "local@あいうえお.com",
        ])
            ('supports %s', (s) => {

                const svo = EmailAddress.parse(s);
                expect(svo?.toString()).toBe(s);
            });
    });

    describe('IP based', () => {

        it('supportes IPv4 with brackets', () => {
            const svo = EmailAddress.tryParse('valid.ipv4.addr@[123.1.72.10]');
            expect(svo?.toString()).toBe('valid.ipv4.addr@[123.1.72.10]');
        });

        it('supportes IPv4 without brackets', () => {
            const svo = EmailAddress.tryParse('valid.ipv4.addr@123.1.72.10');
            expect(svo?.toString()).toBe('valid.ipv4.addr@[123.1.72.10]');
        });

        it('Trims leading zeros', () => {
            const svo = EmailAddress.tryParse('valid.ipv4.addr@123.001.072.10');
            expect(svo?.toString()).toBe('valid.ipv4.addr@[123.1.72.10]');
        });

        it('indicates an email address to be IP-based', () => {

            const ip = EmailAddress.tryParse('valid.ipv4.addr@123.001.072.10');
            expect(ip!.isIPBased).toBe(true);

            const non = EmailAddress.tryParse('info@qowaiv.org');
            expect(non!.isIPBased).toBe(false);
        });

        test.each([
            'user@[IPv6:2001:db8:1ff::a0b:dbd0]',
            'valid.ipv6.addr@[IPv6:0::1]',
            'valid.IPV6.addr@[IPV6:0::1]',
            'valid.ipv6.addr@[ipv6:0::1]',
            'valid.ipv6.addr@[IPv6:2607:f0d0:1002:51::4]',
            'valid.ipv6.addr@[IPv6:fe80::230:48ff:fe33:bc33]',
            'valid.ipv6.addr@[IPv6:fe80:0000:0000:0000:0202:b3ff:fe1e:8329]',
            'valid.ipv6v4.addr@[IPv6:aaaa:aaaa:aaaa:aaaa:aaaa:aaaa:127.0.0.1]',
            'valid.ipv6.without-brackets@[2607:f0d0:1002:51::4]',
            'valid.ipv6.without-brackets@2607:f0d0:1002:51::4',
        ])
            ('%s supports IPv6', (s) => {

            });
    });

    test.each([
        // no local
        '@qowaiv.org',
        '""@qowaiv.org',

        // too long local
        '12345678901234567890123456789012345678901234567890123456789012345@qowaiv.org',
        '"123456789012345678901234567890123456789012345678901234567890123"@qowaiv.org',

        // invalid ASCII in local
        'info\t@qowaiv.org',

        // too long domain part
        'info@1234567890123456789012345678901234567890123456789012345678901234',
        'info@1234567890123456789012345678901234567890123456789012345678901234.org',

        // wrong dots
        '.info@qowaiv.org',
        'info.@qowaiv.org',
        'info..other@qowaiv.org',
        'info.other@qowaiv.org.',

        // wrong dashes
        'info@-qowaiv.org',
        'info@qowaiv.org-',
        'info@qowaiv-.org',
        'info@qowaiv.-org',

        // invalid punycodes
        '"info@qowaiv@xn-bcher-kva8445foa',
        '"info@qowaiv@xn--e',
        '"info@qowaiv@xn--',

        // invalid domains
        'info@',
        'info@q',

        // exactly one @
        'info_at_qowaiv.org',
        'info@qowaiv@org',
        'info(@)qowaiv.org',

        // invalid display names
        'Display Name info@qowaiv.org>',
        'Display Name <info@qowaiv.org>>',
        'Display Name >info@qowaiv.org<',
        'Display Name info@qowaiv.org<>',
        'info@qowaiv.org (',
        'info@qowaiv.org )',
        'info@qowaiv.org ))',
        'info@qowaiv.org ())',
        'info@qowaiv.org (()',
        'info@qowaiv.org )(',
        '"Display Name info@qowaiv.org',
        '"Display Name <"Display Name info@qowaiv.org>',
        '"Display"" info@qowaiv.org',
        "'Joe Smith' info@qowaiv.org",
        'Joe Smith &lt;info@qowaiv.org&gt;',

        // mixed display
        'Display Name <info@qowaiv.org> (after name with display)',
        '"With extra  display name" Display Name<info@qowaiv.org>',

        // comments,
        'inf(o@qowaiv.org',
        'info)@qowaiv.org',
        'inf(?))o@qowaiv.org',
        'in)wrong order(fo@qowaiv.org',
        'ipv4.addr@[123.1.7(some comment)2.10]',
        'ipv4.addr@123.1.7(some comment)2.10',
        'in( nested(extra) )fo@qowaiv.org',

        // prefixes
        'in_domain@mailto:qowaiv.org',
        'mailto:mailto:twice@qowaiv.org',
        'not_at_start_mailto:info@qowaiv.org',
        'at_end_mailto:@qowaiv.org',
        'mai(comment)lto:info@qowaiv.org',

        // IPv4 out of range
        'email@111.222.333',
        'email@111.222.333.256',

        // IPv4 with bracket errors
        'email@]123.123.123.123[',
        'email@[123.123.123.123',
        'email@[123.123.123].123',
        'email@123.123.123.123]',
        'email@123.123.[123.123]',

        // IPv6
        'IP-and-port@127.0.0.1:25',
        'another-invalid-ip@127.0.0.256',
        'invalid-ip@127.0.0.1.26',
        'ipv4.with.ipv6prefix.addr@[IPv6:123.1.72.10]',
        'ab@988.120.150.10',
        'ab@120.256.256.120',
        'ab@120.25.1111.120',
        'ab@[188.120.150.10',
        'ab@188.120.150.10]',
        'ab@[188.120.150.10].com',
    ])
        ('can not parse %s', (s) => {
            const svo = EmailAddress.tryParse(s);
            expect(svo).toBeInstanceOf(Unparsable);
        });
});

class Create {
    public static string(ch: string, len: number): string {
        let str = '';
        for (let i = 0; i < len; i++) {
            str += ch;
        }
        return str;
    }
}
