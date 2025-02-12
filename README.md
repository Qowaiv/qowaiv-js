![Qowaiv](https://github.com/Qowaiv/Qowaiv/blob/master/design/qowaiv-logo_linkedin_100x060.jpg)
[![Code of Conduct](https://img.shields.io/badge/%E2%9D%A4-code%20of%20conduct-blue.svg?style=flat)](https://github.com/Qowaiv/Qowaiv.js/blob/master/CODE_OF_CONDUCT.md)

# Qowaiv.js

## Domain-driven design bottom up
Qowaiv is a (Single) Value Object library. It aims to model reusable (Single)
Value Objects that can be used a wide variety of modeling scenarios, both
inside and outside a Domain-driven context.

Supported scenarios include parsing, formatting, validation, (de)serialization,
and domain specific logic.

## TypeScript
As developement tool, we addopted [TypeScript](http://typescriptlang.org/).

# Single Value Object
A Value Object that can be represented by a single scalar.

## Empty state
In Qowaiv.NET - for non continuous - SVO's there is a not-null state: The
default state of the `struct`. Such concept does not exist in JavaScript. As a
result, for empty states, `null` is used. So for example:

``` TypeScript
const svo = PostalCode.parse(''); // null.
```

## Qowaiv types

### Guid
Represents a Globally Unique Identifier (GUID). 

``` TypeScript
const next = Guid.newGuid(); // 123E4567-E89B-12D3-A456-426655440000
const str = next.format("B"); // {123E4567-E89B-12D3-A456-426655440000}
```

### Email address
Represents an email address. It supports
* local part with quotes (`"Can contain anything"@qowaiv.org`)
* comments (`in(some comment)fo@qowaiv.org`)
* Display Names
  - `John Smith <info@qowaiv.org>`
  - `"John Smith" info@qowaiv.org`
  - `info@qowaiv.org (John Smith)`
* Mailto prefix (`mailto:info@qowaiv.org`)
* IP-based domins (`info@[127.0.0.1]`)

Comments, display names, and the mailto prefix are stripped.

``` TypeScript
const email = Email.parse('info@qowaiv.org');
const ip = Email.parse('info@[127.0.0.1]');

const isIP = ip.isIpBased; // true
```

### InternationBankAccountNumber
Represnts a IBAN.

``` TypeScript
const iban = InternationBankAccountNumber.parse('NL20INGB0001234567');
const country = iban.country; // 'NL';
const formatted = iban.format(); // 'NL20 INGB 0001 2345 67' with nbsp.
const lower = iban.format('h');  // 'nl20 ingb 0001 2345 67' with nbsp.
```

### PostalCode
Represents a postal code. It supports validation for all countries.

``` TypeScript
const dutch = PostalCode.parse('2624DP');
dutch.isValid('NL'); // true
dutch.isValid('BE'); // false

const argentina = PostalCode.Parse('Z1230ABC');
argentina.format('AR'); // Z 1230 ABC
argentina.format('NL'); // Z1230ABC
```

## Qowaiv Interfaces

### IFormattable
As JavaScript does not support method overloading, this interface makes explicit
by including `toString()` and `format(f?: string)` that the `format` method
should be the overloaded version of `toString`.

``` TypeScript
interface IFormattable {
    toString(): string;
    format(f?: string): string;
}
```

### IEquatable
As JavaScript does not have a way to support equals overloading as a lot of 
other languages do, but it gives something.

``` TypeScript
interface IEquatable {
    equals(other: any): boolean;
}
```

Compared with the follow snippet, you could work arround it, although using a
function `eq(l, r)` over `l === r` is obvious not trivial, or close to ideal.

``` JavaScript
function eq(l, r) {
    if (arguments.length !== 2) { throw new Error('Invalid number of arguments.'); }
    if (l !== null && l !== undefined && typeof (l.equals) === 'function') {
        return l.equals(r);
    }
    if (r !== null && r !== undefined && typeof (r.equals) === 'function') {
        return r.equals(l);
    }
    return l === r;
} 
```

### IJsonStringifyable
To support `JSON.stringify()` this interface was introduced.

``` TypeScript
interface IJsonStringifyable {
    toJSON(): any;
}
```
