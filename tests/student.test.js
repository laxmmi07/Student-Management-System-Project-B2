import { Selector } from 'testcafe';

const BASE_URL = 'http://127.0.0.1:5500/client/index.html';

fixture('Student Management System')
  .page(BASE_URL)
  .beforeEach(async t => {
    await t.wait(3000); // wait for API data to load
  });

// Test 1: Page loads correctly
test('Page loads and shows the header', async t => {
  await t
    .expect(Selector('h1').innerText).contains('Student Management System');
});

// Test 2: Students are displayed in the table
test('Students are loaded and displayed in table', async t => {
  const rows = Selector('#student-tbody tr');
  await t
    .expect(rows.count).gt(0);
});

// Test 3: Can add a new student (POST)
test('Can add a new student', async t => {
  const initialCount = await Selector('#student-tbody tr').count;

  await t
    .typeText('#firstName', 'TestFirst')
    .typeText('#lastName', 'TestLast')
    .typeText('#email', `test${Date.now()}@uni.edu`)
    .typeText('#course', 'Test Course')
    .typeText('#year', '2')
    .typeText('#gpa', '3.5')
    .typeText('#phone', '9841000099')
    .click('#submit-btn')
    .wait(2000)

  await t
    .expect(Selector('#student-tbody tr').count).gt(initialCount);
});

// Test 4: Search filters students
test('Search filters the student list', async t => {
  await t
    .typeText('#search-input', 'Computer Science')
    .wait(1000)

  const rows = Selector('#student-tbody tr');
  await t.expect(rows.count).gt(0);
});

// Test 5: Edit button populates the form
test('Edit button loads student data into form', async t => {
  await t
    .click(Selector('.btn-edit').nth(0))
    .wait(1000)
    .expect(Selector('#form-title').innerText).contains('Edit')
    .expect(Selector('#student-id').value).notEql('');
});

// Test 6: Can delete a student (DELETE)
test('Can delete a student', async t => {
  const initialCount = await Selector('#student-tbody tr').count;

  await t
    .setNativeDialogHandler(() => true)
    .click(Selector('.btn-delete').nth(0))
    .wait(2000)

  await t
    .expect(Selector('#student-tbody tr').count).lt(initialCount);
});

// Test 7: Stats section is visible with student counts
test('Stats section is visible with student counts', async t => {
  await t
    .expect(Selector('.stat-card').count).gte(4);
});