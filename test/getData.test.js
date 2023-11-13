import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import '../challenge-table';


describe('ChallengeTable', () => {
    it('has a feature called active that defaults to false', async () => {
        const ct = await fixture(html`
            <challenge-table></challenge-table>
        `);

        expect(ct.active).to.equal(false);
        expect(ct.dynamicButton).to.equal("Get Dynamic Data");
    });

    it('sets active to true when Get Dynamic Data is clicked', async () => {
        const ct = await fixture(html`
          <challenge-table></challenge-table>
        `);
        ct.shadowRoot.querySelector('.dynamic-data-button').click();
    
        expect(ct.active).to.equal(true);
      });

      

      
      });



