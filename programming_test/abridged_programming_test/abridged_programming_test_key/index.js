/*
  Elucid Programming Assessment
*/
QUnit.module ('citation');

/*
  The global database variable represents a
  simple book citation database.
*/
var DATABASE = [
  {
    title: 'The Art of Computer Programming',
    authors: ['Donald Knuth'],
    year: 1968,
  },
  {
    title: 'Concrete Mathematics',
    authors: ['Donald Knuth'],
    year: 1994
  },
  {
    title: 'Concrete Abstractions',
    authors: ['Max Hailperin', 'Barbara Kaiser', 'Karl Knight'],
    year: 1999
  },
  {
    title: 'Introduction to the Theory of Computation',
    authors: ['Michael Sipser'],
    year: 1997
  },
  {
    title: 'Introduction to Algorithms',
    authors: ['Thomas H. Cormen', 'Charles E. Leiserson', 'Ronald L. Rivest', 'Clifford Stein'],
    year: 1990
  }
];

// I. Predicate Functions

/*
  Accepts two arguments: citation, a Citation
  object; and year, an integer; and returns true
  iff the citation's year is equal to year.
*/
function hasYear (citation, year) { return citation.year === year; }

/*
  Accepts two arguments: citation, a Citation
  object; and year, an integer; and returns true
  iff citation's year is greater than or equal
  to year.
*/
function afterYear (citation, year) { return citation.year >= year; }

/*
  Accepts two arguments: citation, a Citation
  object; and year, an integer; and returns
  true iff citation's year is less than or equal
  to year.
*/
function beforeYear (citation, year) { return citation.year <= year; }

/*
  Accepts two arguments: citation, a Citation
  object; and range, a Range object; and returns
  true iff citation's year is greater than or
  equal to range.start and less than or equal
  to range.end. Both range.start and range.end
  are optional. If range.start is omitted, this
  function omits the lower bound. If range.end is
  omitted, this function omits the upper bound.

  Range must have the following structure:

    {start: INTEGER, end: INTEGER}.
*/
function inRange (citation, range) {
  return (range.start == null || afterYear  (citation, range.start)) &&
         (range.end   == null || beforeYear (citation, range.end)); 
}

// Unit tests for inRange.
QUnit.test ('inRange',
  function (assert) {
    assert.equal (inRange (DATABASE [0], {}),                                       true);
    assert.equal (inRange (DATABASE [0], {start: 1967}),                            true);
    assert.equal (inRange (DATABASE [0], {start: 1968}),                            true);
    assert.equal (inRange (DATABASE [0], {start: 1969}),                            false);
    assert.equal (inRange (DATABASE [0], {end: 1967}),                              false);
    assert.equal (inRange (DATABASE [0], {end: 1968}),                              true);
    assert.equal (inRange (DATABASE [0], {end: 1969}),                              true);
    assert.equal (inRange (DATABASE [0], {start: 1967, end: 1969}),                 true);
    assert.equal (inRange (DATABASE [0], {start: 1968, end: 1968}),                 true);
    assert.equal (inRange (DATABASE [0], {start: 1969, end: 1970}),                 false);  
    assert.equal (inRange (DATABASE [0], {end: 0}),                                 false);
    assert.equal (inRange ({title: '', authors: [], year: 0}, {start: 0, end: 0}),  true);
    assert.equal (inRange ({title: '', authors: [], year: -1}, {start: 0, end: 0}), false);
});

/*
  Accepts two arguments: citation, a Citation
  object; and, author, a string; and returns
  true iff citation has author.
*/
function hasAuthor (citation, author) { return citation.authors.includes (author); }

/*
  Accepts two arguments: citation, a Citation
  object; and authors, a string array; and
  returns true iff citation has one, or more,
  of the authors listed in authors.
*/
function hasAnAuthor (citation, authors) {
  return authors.some (function (author) { return hasAuthor (citation, author); });
}

// Unit tests for hasAnAuthor.
QUnit.test ('hasAnAuthor',
  function (assert) {
    assert.equal (hasAnAuthor (DATABASE [0], []), false);
    assert.equal (hasAnAuthor (DATABASE [0], ['Donald Knuth']), true);
    assert.equal (hasAnAuthor (DATABASE [0], ['Donald Knuth', 'Barbara Kaiser']), true);
    assert.equal (hasAnAuthor (DATABASE [0], ['Barbara Kaiser', 'Donald Knuth']), true);
    assert.equal (hasAnAuthor (DATABASE [0], ['Barbara Kaiser', 'Karl Knight']), false);
    assert.equal (hasAnAuthor (DATABASE [4], ['Barbara Kaiser', 'Karl Knight', 'Ronald L. Rivest']), true);
    assert.equal (hasAnAuthor (DATABASE [4], ['Barbara Kaiser', 'Karl Knight', 'Ronald L. Rivest', 'Clifford Stein']), true); 
    assert.equal (hasAnAuthor (DATABASE [4], ['Barbara Kaiser', 'Karl Knight', 'Clifford Stein']), true); 
});

/*
  Accepts two arguments: citation, a Citation
  object; and titleString, a string; and returns
  true iff citation's title contains titleString
  as a substring.
*/
function hasTitleString (citation, titleString) { return citation.title.includes (titleString); }

// Unit tests for hasTitleString.
QUnit.test ('hasTitleString',
  function (assert) {
    assert.equal (hasTitleString (DATABASE [0], ''), true);
    assert.equal (hasTitleString (DATABASE [0], 'Art'), true);
    assert.equal (hasTitleString (DATABASE [0], 'art'), false);
    assert.equal (hasTitleString (DATABASE [0], 'incorrect'), false);
    assert.equal (hasTitleString (DATABASE [0], 'The Art of Computer Programming'), true);
});

/*
  Accepts two arguments: citation, a Citation
  object; and query, a Query object; and returns
  true iff citation matches the constraints
  given in query.

  Query must have the following structure:
  {title: STRING, authors: [STRING], years:
  {start: INT, end: INT}}, where every property
  is optional. If every parameter is omitted,
  this function returns true.
*/
function matchesQuery (citation, query) {
  return (query.title   == null || hasTitleString (citation, query.title))   &&
         (query.authors == null || hasAnAuthor    (citation, query.authors)) &&
         (query.years   == null || inRange        (citation, query.years));
}

// Unit tests for matchesQuery.
QUnit.test ('matchesQuery',
  function (assert) {
    assert.equal (matchesQuery (DATABASE [0], {}), true);
    assert.equal (matchesQuery (DATABASE [0], {title: ''}), true);
    assert.equal (matchesQuery (DATABASE [0], {title: 'Art'}), true);
    assert.equal (matchesQuery (DATABASE [0], {title: 'art'}), false);
    assert.equal (matchesQuery (DATABASE [0], {authors: []}), false);
    assert.equal (matchesQuery (DATABASE [0], {authors: ['Donald Knuth']}), true);
    assert.equal (matchesQuery (DATABASE [0], {authors: ['Barbara Kaiser', 'Donald Knuth']}), true);
    assert.equal (matchesQuery (DATABASE [0], {authors: ['Barbara Kaiser', 'Karl Knight']}), false);
    assert.equal (matchesQuery (DATABASE [4], {authors: ['Barbara Kaiser', 'Karl Knight', 'Clifford Stein']}), true);
    assert.equal (matchesQuery (DATABASE [0], {years: {}}), true);
    assert.equal (matchesQuery (DATABASE [0], {years: {start: 1967}}), true);
    assert.equal (matchesQuery (DATABASE [0], {years: {start: 1968}}), true);
    assert.equal (matchesQuery (DATABASE [0], {years: {start: 1969}}), false);
    assert.equal (matchesQuery (DATABASE [0], {years: {end: 1967}}), false);
    assert.equal (matchesQuery (DATABASE [0], {years: {end: 1968}}), true);
    assert.equal (matchesQuery (DATABASE [0], {years: {end: 1969}}), true);
    assert.equal (matchesQuery (DATABASE [0], {years: {start: 1967, end: 1969}}), true);
    assert.equal (matchesQuery (DATABASE [0], {years: {start: 1968, end: 1968}}), true);
    assert.equal (matchesQuery (DATABASE [0], {years: {start: 1969, end: 1970}}), false);
    assert.equal (matchesQuery (DATABASE [0], {title: '', authors: ['Donald Knuth'], years: {}}), true);
    assert.equal (matchesQuery (DATABASE [2], {title: 'Concrete', authors: ['Donald Knuth', 'Barbara Kaiser'], years: {start: 1999, end: 1999}}), true);
    assert.equal (matchesQuery (DATABASE [2], {title: 'concrete', authors: ['Donald Knuth', 'Barbara Kaiser'], years: {start: 1999, end: 1999}}), false);
    assert.equal (matchesQuery (DATABASE [2], {title: 'Concrete', authors: ['Donald Knuth'], years: {start: 1999, end: 1999}}), false);
    assert.equal (matchesQuery (DATABASE [2], {title: 'Concrete', authors: ['Donald Knuth', 'Barbara Kaiser'], years: {start: 2000, end: 2001}}), false);
});

// II. Filter Functions

/*
  Accepts two arguments: citations, a Citation
  array; and year, an integer; and returns those
  citations whose year equals year.

  Note: Problem 1.
*/
function filterByYear (citations, year) {
  return citations.filter (function (citation) { return hasYear (citation, year); });
}

/*
  Accepts two arguments: citations, a Citation
  array; and start, an integer; and returns
  those citations whose year is greater than or
  equal to start.
*/
function filterByStart (citations, start) {
  return citations.filter (function (citation) { return afterYear (citation, start); });
}

/*
  Accepts two arguments: citations, a Citation
  array; and end, an integer; and returns those
  citations whose year is less than or equal
  to end.
*/
function filterByEnd (citations, end) {
  return citations.filter (function (citation) { return beforeYear (citation, end); });
}

/*
  Accepts two arguments: citations, a Citation
  array; and range, a Date Range; and returns
  those citations in citations whose year is
  greater than or equal to range.start and less
  than or equal to range.end. If range.start is
  omitted this function does not apply any lower
  bound. If range.end is omitted this function
  does not apply any upper bound.
*/
function filterByRange (citations, range) {
  return citations.filter (function (citation) { return inRange (citation, range); });
}

/*
  Accepts two arguments: citations, a Citation
  array; and author, a string; and returns
  those citations in citations that list the
  given author.

  Note: problem 2.
*/
function filterByAuthor (citations, author) {
  return citations.filter (function (citation) { return hasAuthor (citation, author); });
}

/*
  Accepts two arguments: citations, a Citation
  array; and authors, a string array; and returns
  those citations in citations that have one or
  more of the authors listed in authors.
*/
function filterByAuthors (citations, authors) {
  return citations.filter (function (citation) { return hasAnAuthor (citation, authors); });
}

/*
  Accepts two arguments: citations, a Citation
  array; and titleString, a string; and
  returns those citations whose titles contain
  titleString as a substring.

  Note: problem 3.
*/
function filterByTitleString (citations, titleString) {
  return citations.filter (function (citation) { return hasTitleString (citation, titleString); });
}

/*
  Accepts two arguments: citations, a Citation
  array; and query, a Query object; and returns
  those citations in citations that match query.

  Every Query has the following structure:
  {title: STRING, authors: [STRING], years:
  {start: INT, end: INT}}, where every property
  is optional. If every parameter is omitted,
  this function returns every citation in
  citations.

  Note: Problem 5.
*/
function filterByQuery (citations, query) {
  return citations.filter (function (citation) { return matchesQuery (citation, query); });
}

// III. Auxiliary Functions

/*
  Accepts a Citation object and returns its
  authors as a string array.

  Note: problem 4.
*/
function getAuthors (citations) {
  return union (
    citations.map (
      function (citation) {
        return citation.authors;
  })).sort ();
}

// Unit tests for getAuthors.
QUnit.test ('getAuthors',
  function (assert) {
    assert.deepEqual (getAuthors ([]), []);
    assert.deepEqual (getAuthors (DATABASE), ['Barbara Kaiser', 'Charles E. Leiserson', 'Clifford Stein', 'Donald Knuth', 'Karl Knight', 'Max Hailperin', 'Michael Sipser', 'Ronald L. Rivest', 'Thomas H. Cormen']);
});

/*
  Accepts one argument: arrays, an array
  of arrays; and returns a new array that
  represents the (set-theoretic) union of the
  arrays in arrays.
*/
function union (arrays) {
  return arrays.reduceRight (
    function (result, array) {
      return array.reduceRight (add, result);
    }, []
  );
}

/*
  Accepts two arguments: array, an array; and
  value; adds value to array iff none of
  the values in array equal value; and returns
  array.
*/
function add (array, value) {
  array.includes (value) || array.push (value);
  return array;
}
