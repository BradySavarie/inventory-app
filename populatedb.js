#! /usr/bin/env node

console.log(
    'This script populates some test effects, effect instances, categories and manufacturers to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Effect = require('./models/effect');
const EffectInstance = require('./models/effectInstance');
const Category = require('./models/category');
const Manufacturer = require('./models/manufacturer');

const categories = [];
const manufacturers = [];
const effects = [];
const effectinstances = [];

const mongoose = require('mongoose');
const category = require('./models/category');
mongoose.set('strictQuery', false);

const mongoDB =
    'mongodb+srv://BradySavarie:Robert1998@cluster0.zq27oze.mongodb.net/inventory_app?retryWrites=true&w=majority';
main().catch((err) => console.log(err));

async function main() {
    console.log('Debug: About to connect');
    await mongoose.connect(mongoDB);
    console.log('Debug: Should be connected?');
    await createCategories();
    await createManufacturers();
    await createEffects();
    await createEffectInstances();
    console.log('Debug: Closing mongoose');
    mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function categoryCreate(index, name) {
    const category = new Category({ name: name });
    await category.save();
    categories[index] = category;
    console.log(`Added category: ${name}`);
}

async function manufacturerCreate(index, name) {
    const manufacturer = new Manufacturer({ name: name });
    await manufacturer.save();
    manufacturers[index] = manufacturer;
    console.log(`Added manufacturer: ${name}`);
}

async function effectCreate(
    index,
    model,
    manufacturer,
    category,
    description,
    price
) {
    const effectdetail = {
        model: model,
        manufacturer: manufacturer,
        category: category,
        description: description,
        price: price,
    };

    const effect = new Effect(effectdetail);
    await effect.save();
    effects[index] = effect;
    console.log(`Added effect: ${model}`);
}

async function effectInstanceCreate(index, effect, condition) {
    const effectinstancedetail = {
        effect: effect,
        condition: condition,
    };

    const effectinstance = new EffectInstance(effectinstancedetail);
    await effectinstance.save();
    effectinstances[index] = effectinstance;
    console.log(`Added effectinstance: ${effect}`);
}

async function createCategories() {
    console.log('Adding categories');
    await Promise.all([
        categoryCreate(0, 'Boost'),
        categoryCreate(1, 'Overdrive'),
        categoryCreate(2, 'Distortion'),
        categoryCreate(3, 'Fuzz'),
        categoryCreate(4, 'Delay'),
        categoryCreate(5, 'Reverb'),
    ]);
}

async function createManufacturers() {
    console.log('Adding manufacturers');
    await Promise.all([
        manufacturerCreate(0, 'Xotic'),
        manufacturerCreate(1, 'Keeley'),
    ]);
}

async function createEffects() {
    console.log('Adding effects');
    await Promise.all([
        effectCreate(
            0,
            'EP Booster',
            manufacturers[0],
            categories[0],
            "What do the tones of renowned guitarist such as Page, EVH and Johnson have in common? They all used the legendary echo machine EP-3 as a pre-amp. We've captured that magic in a new Xotic Effects pedal, the EP Booster. We've used the highest quality parts available with a discrete FET design and low impedance output, the EP Booster provides up to +20dB of unadulterated boost with multi-dimensional, shimmering highs and lows, and no ear fatigue. The internal DIP switches let you choose the boost frequencies, and EQ settings. A simple pure boost that pays reverence to the magical EP-3 and captures the celebrated tones of the world's most famous players. The EP-Booster,great tone starts here! True bypass for eliminating any signal interference when switched off. Can be used with AC adaptor (optional) or 9V Battery.",
            130
        ),
        effectCreate(
            1,
            'Katana Mini',
            manufacturers[1],
            categories[0],
            "Clean and super powerful MINI KATANA CLEAN BOOST! Keeley's oldest design, made smaller and with an additional feature. The Katana started back in 2002 within the Time Machine Boost. It was a dual class A JFET design that gave players an incredible boost and sounded so good, they never turned off. In fact, they often ran two or three on stages like John Mayer! The Mini Katana boost provides over 35dB of boost - enough for the most demanding players and sound reinforcement.",
            155
        ),
    ]);
}

async function createEffectInstances() {
    console.log('Adding effect instances');
    await Promise.all([
        effectInstanceCreate(0, effects[0], 'Brand New'),
        effectInstanceCreate(1, effects[1], 'Brand New'),
    ]);
}
